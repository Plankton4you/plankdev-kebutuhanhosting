/**
 * Pterodactyl Panel Setup Script
 * Run this script on your Pterodactyl panel server to configure API access
 */

const fs = require("fs")
const path = require("path")

// Configuration with real API keys
const CONFIG = {
  panelUrl: "https://galangcoganzz.dzhost.my.id",
  domain: "galangcoganzz.dzhost.my.id",
  applicationApiKey: "ptla_aXfEo7ZRiko6eRI8t0DdazeV9Q2oUiFn37kiLM2FqQB",
  clientApiKey: "ptlc_hunyH3Lw5Vva3CGLygpdq916bh2kkWEGvaUNavPY26Z",
}

// API Helper Functions
async function makeApiRequest(endpoint, method = "GET", data = null, useClientApi = false) {
  const apiKey = useClientApi ? CONFIG.clientApiKey : CONFIG.applicationApiKey
  const url = `${CONFIG.panelUrl}/api/${useClientApi ? "client" : "application"}${endpoint}`

  console.log(`Making ${method} request to: ${url}`)
  console.log(`Using API key: ${apiKey.substring(0, 10)}...`)

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
    console.log("Request body:", JSON.stringify(data, null, 2))
  }

  try {
    const response = await fetch(url, options)
    const responseText = await response.text()

    console.log(`Response status: ${response.status}`)
    console.log(`Response body: ${responseText}`)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} - ${responseText}`)
    }

    return JSON.parse(responseText)
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error)
    throw error
  }
}

// Setup Functions
async function createDefaultLocation() {
  try {
    const locationData = {
      short: "default",
      long: "Default Location - PlankDev",
    }

    const response = await makeApiRequest("/locations", "POST", locationData)
    console.log("✅ Default location created:", response.attributes.short)
    return response.attributes.id
  } catch (error) {
    if (error.message.includes("422") || error.message.includes("already exists")) {
      console.log("ℹ️  Default location already exists, fetching existing...")
      // Get existing location
      const locations = await makeApiRequest("/locations")
      if (locations.data && locations.data.length > 0) {
        console.log("✅ Using existing location:", locations.data[0].attributes.short)
        return locations.data[0].attributes.id
      }
    }
    throw error
  }
}

async function createDefaultNode(locationId) {
  try {
    const nodeData = {
      name: "PlankDev-Node-01",
      location_id: locationId,
      fqdn: CONFIG.domain,
      scheme: "https",
      memory: 8192,
      memory_overallocate: 0,
      disk: 102400,
      disk_overallocate: 0,
      upload_size: 100,
      daemon_listen: 8080,
      daemon_sftp: 2022,
      daemon_base: "/var/lib/pterodactyl/volumes",
    }

    const response = await makeApiRequest("/nodes", "POST", nodeData)
    console.log("✅ Default node created:", response.attributes.name)
    return response.attributes.id
  } catch (error) {
    if (error.message.includes("422") || error.message.includes("already exists")) {
      console.log("ℹ️  Default node already exists, fetching existing...")
      // Get existing node
      const nodes = await makeApiRequest("/nodes")
      if (nodes.data && nodes.data.length > 0) {
        console.log("✅ Using existing node:", nodes.data[0].attributes.name)
        return nodes.data[0].attributes.id
      }
    }
    throw error
  }
}

async function checkNests() {
  try {
    // Check if default nests exist
    const nests = await makeApiRequest("/nests")

    if (nests.data.length > 0) {
      console.log("✅ Found", nests.data.length, "nests")
      nests.data.forEach((nest) => {
        console.log(`   - ${nest.attributes.name} (ID: ${nest.attributes.id})`)
      })
      return nests.data[0].attributes.id
    }

    console.log("⚠️  No nests found. Please import default nests manually from Pterodactyl's GitHub repository.")
    return null
  } catch (error) {
    console.error("Error checking nests:", error)
    return null
  }
}

async function createAllocations(nodeId) {
  try {
    const allocationData = {
      ip: "0.0.0.0",
      ports: ["25565", "25566", "25567", "25568", "25569", "3000", "8080", "8081", "8082", "8083"],
    }

    const response = await makeApiRequest(`/nodes/${nodeId}/allocations`, "POST", allocationData)
    console.log("✅ Default allocations created")
    return response
  } catch (error) {
    if (error.message.includes("422") || error.message.includes("already exists")) {
      console.log("ℹ️  Allocations already exist")
    } else {
      console.error("Error creating allocations:", error)
    }
  }
}

// Test API connection
async function testApiConnection() {
  try {
    console.log("🔍 Testing API connection...")
    const response = await makeApiRequest("/users?per_page=1")
    console.log("✅ API connection successful")
    console.log(`   Found ${response.meta.pagination.total} users in the panel`)
    return true
  } catch (error) {
    console.error("❌ API connection failed:", error.message)
    return false
  }
}

// Main setup function
async function setupPterodactyl() {
  console.log("🚀 Starting Pterodactyl setup for PlankDev...\n")
  console.log("📋 Configuration:")
  console.log(`   Panel URL: ${CONFIG.panelUrl}`)
  console.log(`   Domain: ${CONFIG.domain}`)
  console.log(`   Application API Key: ${CONFIG.applicationApiKey.substring(0, 15)}...`)
  console.log(`   Client API Key: ${CONFIG.clientApiKey.substring(0, 15)}...\n`)

  try {
    // Test API connection first
    const connectionOk = await testApiConnection()
    if (!connectionOk) {
      throw new Error("API connection failed. Please check your API keys and panel URL.")
    }

    console.log("\n📍 Setting up default location...")
    const locationId = await createDefaultLocation()

    console.log("\n🖥️  Setting up default node...")
    const nodeId = await createDefaultNode(locationId)

    console.log("\n🥚 Checking nests...")
    const nestId = await checkNests()

    console.log("\n🔌 Setting up allocations...")
    await createAllocations(nodeId)

    console.log("\n✅ Pterodactyl setup completed successfully!")
    console.log("\n📋 Final Configuration Summary:")
    console.log(`   Panel URL: ${CONFIG.panelUrl}`)
    console.log(`   Location ID: ${locationId}`)
    console.log(`   Node ID: ${nodeId}`)
    console.log(`   Nest ID: ${nestId || "Please import nests manually"}`)

    // Save configuration
    const configFile = {
      panelUrl: CONFIG.panelUrl,
      domain: CONFIG.domain,
      locationId,
      nodeId,
      nestId,
      setupDate: new Date().toISOString(),
      apiKeysConfigured: true,
    }

    fs.writeFileSync(path.join(__dirname, "pterodactyl-config.json"), JSON.stringify(configFile, null, 2))

    console.log("\n💾 Configuration saved to pterodactyl-config.json")
    console.log("\n🎉 Your Pterodactyl panel is now ready for automatic user and server creation!")

    if (!nestId) {
      console.log("\n⚠️  IMPORTANT: Please import default nests to enable server creation:")
      console.log("   1. Go to your panel admin area")
      console.log("   2. Navigate to Nests section")
      console.log("   3. Import nests from Pterodactyl's official repository")
      console.log("   4. Make sure you have at least one egg configured")
    }
  } catch (error) {
    console.error("\n❌ Setup failed:", error.message)
    console.log("\n🔧 Troubleshooting tips:")
    console.log("   1. Verify your API keys are correct")
    console.log("   2. Make sure your panel URL is accessible")
    console.log("   3. Check that your API keys have the required permissions")
    console.log("   4. Ensure your panel is running the latest version")
    process.exit(1)
  }
}

// Export functions for use in API
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    setupPterodactyl,
    makeApiRequest,
    CONFIG,
  }
}

// Run setup if called directly
if (require.main === module) {
  setupPterodactyl()
}
