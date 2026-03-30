const { exec } = require('child_process');
const path = require('path');
const os = require('os');

class NavaQuantSDK {
    /**
     * Initializes the NavaQuant SDK
     */
    constructor() {
        this.dashboardPath = path.join(__dirname, 'index.html');
    }

    /**
     * Launches the Console (NavaQuant Dashboard) in the default web browser.
     */
    launchViewer() {
        console.log("⚽ Initializing NavaQuant Dashboard...");
        
        let command;
        // Handle different operating systems
        switch (os.platform()) {
            case 'darwin': // macOS
                command = `open "${this.dashboardPath}"`;
                break;
            case 'win32': // Windows
                command = `start "" "${this.dashboardPath}"`;
                break;
            default: // Linux and others
                command = `xdg-open "${this.dashboardPath}"`;
                break;
        }

        exec(command, (error) => {
            if (error) {
                console.error(`❌ Error launching TV Viewer: ${error.message}`);
                return;
            }
            console.log("✅ TV Viewer is now live in your default browser!");
        });
    }

    /**
     * Get the absolute path to the Dashboard HTML file
     * @returns {string} The path to index.html
     */
    getViewerPath() {
        return this.dashboardPath;
    }
}

// Export as an SDK module
module.exports = NavaQuantSDK;

// If the script is run directly from the command line, automatically launch it
if (require.main === module) {
    const sdk = new NavaQuantSDK();
    sdk.launchViewer();
}
