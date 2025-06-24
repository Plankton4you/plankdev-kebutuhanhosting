import { type NextRequest, NextResponse } from "next/server"

// Pterodactyl Panel Configuration
const PTERODACTYL_CONFIG = {
  url: process.env.PTERODACTYL_URL || "https://galangcoganzz.dzhost.my.id",
  apiKey: process.env.PTERODACTYL_API_KEY || "ptlc_hunyH3Lw5Vva3CGLygpdq916bh2kkWEGvaUNavPY26Z",
  applicationApiKey: process.env.PTERODACTYL_APPLICATION_API_KEY || "ptla_aXfEo7ZRiko6eRI8t0DdazeV9Q2oUiFn37kiLM2FqQB",
}

// Panel specifications mapping
const PANEL_SPECS = {
  "panel-1gb": { memory: 1024, disk: 5120, cpu: 50, databases: 2, backups: 1 },
  "panel-2gb": { memory: 2048, disk: 10240, cpu: 75, databases: 3, backups: 2 },
  "panel-3gb": { memory: 3072, disk: 15360, cpu: 100, databases: 4, backups: 3 },
  "panel-4gb": { memory: 4096, disk: 20480, cpu: 125, databases: 5, backups: 4 },
  "panel-5gb": { memory: 5120, disk: 25600, cpu: 150, databases: 6, backups: 5 },
  "panel-6gb": { memory: 6144, disk: 30720, cpu: 175, databases: 7, backups: 6 },
  "panel-7gb": { memory: 7168, disk: 35840, cpu: 200, databases: 8, backups: 7 },
  "panel-8gb": { memory: 8192, disk: 40960, cpu: 225, databases: 9, backups: 8 },
  "panel-9gb": { memory: 9216, disk: 46080, cpu: 250, databases: 10, backups: 9 },
  "panel-10gb": { memory: 10240, disk: 51200, cpu: 275, databases: 11, backups: 10 },
  "panel-unlimited": { memory: 0, disk: 0, cpu: 0, databases: 0, backups: 0 },
}

async function createPterodactylUser(userData: any) {
  try {
    console.log("🚀 Creating Pterodactyl user:", userData.username)
    console.log("🔗 API URL:", `${PTERODACTYL_CONFIG.url}/api/application/users`)
    console.log("🔑 API Key:", PTERODACTYL_CONFIG.applicationApiKey.substring(0, 15) + "...")

    const response = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        username: userData.username,
        first_name: userData.username,
        last_name: "User",
        password: userData.password,
      }),
    })

    const responseText = await response.text()
    console.log("📋 Response Status:", response.status)
    console.log("📋 Response Body:", responseText)

    if (!response.ok) {
      throw new Error(`Pterodactyl API Error: ${response.status} - ${responseText}`)
    }

    const result = JSON.parse(responseText)
    console.log("✅ User created successfully:", {
      id: result.attributes.id,
      username: result.attributes.username,
      email: result.attributes.email,
    })

    return result
  } catch (error) {
    console.error("❌ Failed to create Pterodactyl user:", error)
    throw new Error(`User creation failed: ${error.message}`)
  }
}

async function getAvailableAllocation() {
  try {
    console.log("🔍 Getting available allocations...")

    // Get all nodes first
    const nodesResponse = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/nodes`, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!nodesResponse.ok) {
      throw new Error(`Failed to get nodes: ${nodesResponse.status}`)
    }

    const nodesData = await nodesResponse.json()
    console.log("📊 Available nodes:", nodesData.data?.length || 0)

    if (!nodesData.data || nodesData.data.length === 0) {
      throw new Error("No nodes available in Pterodactyl panel")
    }

    const nodeId = nodesData.data[0].attributes.id
    console.log("🖥️ Using node ID:", nodeId)

    // Get allocations for the first node
    const allocationsResponse = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/nodes/${nodeId}/allocations`, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!allocationsResponse.ok) {
      throw new Error(`Failed to get allocations: ${allocationsResponse.status}`)
    }

    const allocationsData = await allocationsResponse.json()
    console.log("📊 Total allocations:", allocationsData.data?.length || 0)

    // Find an unassigned allocation
    const availableAllocation = allocationsData.data?.find((allocation) => !allocation.attributes.assigned)

    if (!availableAllocation) {
      throw new Error("No available allocations found")
    }

    console.log("✅ Using allocation ID:", availableAllocation.attributes.id)
    return availableAllocation.attributes.id
  } catch (error) {
    console.error("❌ Error getting allocation:", error)
    throw error
  }
}

async function getAvailableEgg() {
  try {
    console.log("🥚 Getting available eggs...")

    // Get all nests
    const nestsResponse = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/nests`, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!nestsResponse.ok) {
      throw new Error(`Failed to get nests: ${nestsResponse.status}`)
    }

    const nestsData = await nestsResponse.json()
    console.log("📊 Available nests:", nestsData.data?.length || 0)

    if (!nestsData.data || nestsData.data.length === 0) {
      throw new Error("No nests available in Pterodactyl panel")
    }

    const nestId = nestsData.data[0].attributes.id
    console.log("🏠 Using nest ID:", nestId)

    // Get eggs for the first nest
    const eggsResponse = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/nests/${nestId}/eggs`, {
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!eggsResponse.ok) {
      throw new Error(`Failed to get eggs: ${eggsResponse.status}`)
    }

    const eggsData = await eggsResponse.json()
    console.log("📊 Available eggs:", eggsData.data?.length || 0)

    if (!eggsData.data || eggsData.data.length === 0) {
      throw new Error("No eggs available in Pterodactyl panel")
    }

    const eggId = eggsData.data[0].attributes.id
    console.log("✅ Using egg ID:", eggId)
    return eggId
  } catch (error) {
    console.error("❌ Error getting egg:", error)
    throw error
  }
}

async function createPterodactylServer(userId: number, serverName: string, specs: any) {
  try {
    console.log("🚀 Creating Pterodactyl server:", serverName)

    // Get available allocation and egg
    const allocationId = await getAvailableAllocation()
    const eggId = await getAvailableEgg()

    const serverData = {
      name: serverName,
      user: userId,
      egg: eggId,
      docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
      startup: "npm start",
      environment: {},
      limits: {
        memory: specs.memory,
        swap: 0,
        disk: specs.disk,
        io: 500,
        cpu: specs.cpu,
      },
      feature_limits: {
        databases: specs.databases,
        backups: specs.backups,
        allocations: 1,
      },
      allocation: {
        default: allocationId,
      },
    }

    console.log("📋 Server creation data:", JSON.stringify(serverData, null, 2))

    const response = await fetch(`${PTERODACTYL_CONFIG.url}/api/application/servers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PTERODACTYL_CONFIG.applicationApiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(serverData),
    })

    const responseText = await response.text()
    console.log("📋 Server creation response status:", response.status)
    console.log("📋 Server creation response:", responseText)

    if (!response.ok) {
      throw new Error(`Server creation failed: ${response.status} - ${responseText}`)
    }

    const result = JSON.parse(responseText)
    console.log("✅ Server created successfully:", {
      id: result.attributes.id,
      name: result.attributes.name,
      uuid: result.attributes.uuid,
    })

    return result
  } catch (error) {
    console.error("❌ Failed to create Pterodactyl server:", error)
    throw new Error(`Server creation failed: ${error.message}`)
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const requestBody = await request.json()
    console.log("=== PANEL CREATION API CALLED ===")
    console.log("📋 Request body:", JSON.stringify(requestBody, null, 2))

    const { transaction, product, userData } = requestBody

    // CRITICAL: Check if payment is confirmed
    if (!transaction || transaction.status !== "paid") {
      console.error("❌ PAYMENT NOT CONFIRMED:", transaction?.status)
      return NextResponse.json(
        {
          error: "Payment not confirmed",
          message: "Panel creation requires confirmed payment",
          status: transaction?.status || "unknown",
        },
        { status: 402 }, // Payment Required
      )
    }

    // Validate required data
    if (!userData?.email || !userData?.username || !userData?.password) {
      console.error("❌ Missing user data:", userData)
      return NextResponse.json({ error: "Missing user data" }, { status: 400 })
    }

    if (!product?.id) {
      console.error("❌ Missing product data:", product)
      return NextResponse.json({ error: "Missing product data" }, { status: 400 })
    }

    // Get panel specifications
    const specs = PANEL_SPECS[product.id]
    if (!specs) {
      console.error("❌ Invalid product specification for:", product.id)
      return NextResponse.json({ error: "Invalid product specification" }, { status: 400 })
    }

    console.log("✅ Payment confirmed, proceeding with panel creation...")
    console.log("📋 Using specs:", specs)
    console.log("🔧 Pterodactyl Config:", {
      url: PTERODACTYL_CONFIG.url,
      hasApiKey: !!PTERODACTYL_CONFIG.applicationApiKey,
      apiKeyPrefix: PTERODACTYL_CONFIG.applicationApiKey.substring(0, 10) + "...",
    })

    try {
      console.log("=== STARTING REAL PTERODACTYL INTEGRATION ===")

      // Create user in Pterodactyl
      const user = await createPterodactylUser(userData)
      console.log("✅ User created in Pterodactyl panel")

      // Create server for the user
      const serverName = `${userData.username}-${product.name.toLowerCase().replace(/\s+/g, "-")}`
      const server = await createPterodactylServer(user.attributes.id, serverName, specs)
      console.log("✅ Server created in Pterodactyl panel")

      // Prepare response data
      const panelData = {
        userId: user.attributes.id,
        serverId: server.attributes.id,
        serverName: server.attributes.name,
        serverUuid: server.attributes.uuid,
        username: userData.username,
        password: userData.password,
        loginUrl: PTERODACTYL_CONFIG.url,
        specs: specs,
        createdAt: new Date().toISOString(),
        success: true,
        processingTime: `${Date.now() - startTime}ms`,
        realPanelCreated: true,
      }

      console.log("=== PANEL CREATION SUCCESSFUL ===")
      console.log("🎉 Transaction completed:", {
        transactionId: transaction.id,
        userId: user.attributes.id,
        serverId: server.attributes.id,
        product: product.name,
        loginUrl: PTERODACTYL_CONFIG.url,
        processingTime: `${Date.now() - startTime}ms`,
      })

      return NextResponse.json(panelData)
    } catch (pterodactylError) {
      console.error("=== PTERODACTYL API ERROR ===")
      console.error("❌ Pterodactyl API error:", pterodactylError.message)

      // Return detailed error for debugging
      return NextResponse.json(
        {
          error: "Pterodactyl panel creation failed",
          details: pterodactylError.message,
          debugInfo: {
            panelUrl: PTERODACTYL_CONFIG.url,
            hasApiKey: !!PTERODACTYL_CONFIG.applicationApiKey,
            apiKeyValid: PTERODACTYL_CONFIG.applicationApiKey.startsWith("ptla_"),
            timestamp: new Date().toISOString(),
          },
          contactSupport: "WhatsApp: 08881382817",
          processingTime: `${Date.now() - startTime}ms`,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("=== GENERAL API ERROR ===")
    console.error("❌ Error in create-panel API:", error)

    return NextResponse.json(
      {
        error: "Failed to process panel creation request",
        details: error.message,
        contactSupport: "WhatsApp: 08881382817",
        processingTime: `${Date.now() - startTime}ms`,
      },
      { status: 500 },
    )
  }
}
