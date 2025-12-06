/* Magic Mirror Module: MMM-FMLED
 * Version: 1.0.0
 * 
 * Touch-optimized module for controlling LED and screen brightness
 * By: Wiesty
 * MIT Licensed.
 */

Module.register("MMM-FMLED", {
    defaults: {
        host: "127.0.0.1",
        port: 8081,
        mode: "both" // "led", "screen", "both"
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.ledBrightness = 7;
        this.screenBrightness = 7;
        this.showControls = false;
        this.currentType = "led";
    },

    getStyles: function() {
        return ["MMM-FMLED.css"];
    },

    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "fmled-wrapper";

        const iconsDiv = document.createElement("div");
        iconsDiv.className = "fmled-icons";

        if (this.config.mode === "led" || this.config.mode === "both") {
            const ledIcon = this.createIcon("led.svg", "led");
            iconsDiv.appendChild(ledIcon);
        }

        if (this.config.mode === "screen" || this.config.mode === "both") {
            const screenIcon = this.createIcon("screen.svg", "screen");
            iconsDiv.appendChild(screenIcon);
        }

        wrapper.appendChild(iconsDiv);

        if (this.showControls) {
            const overlay = document.createElement("div");
            overlay.className = "fmled-overlay";
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    this.hideControls();
                }
            });

            const controlsDiv = document.createElement("div");
            controlsDiv.className = "fmled-controls";

            const closeBtn = document.createElement("button");
            closeBtn.className = "fmled-close";
            closeBtn.innerHTML = "×";
            closeBtn.addEventListener("click", (e) => {
                this.hideControls();
                e.preventDefault();
                e.stopPropagation();
            });
            controlsDiv.appendChild(closeBtn);

            const currentType = this.currentType;

            for (let i = 0; i <= 7; i++) {
                const circle = document.createElement("button");
                circle.className = "fmled-circle";
                circle.innerHTML = i;

                circle.addEventListener("click", (e) => {
                    this.setBrightness(currentType, i);
                    this.hideControls();
                    e.preventDefault();
                    e.stopPropagation();
                });

                controlsDiv.appendChild(circle);
            }

            overlay.appendChild(controlsDiv);
            document.body.appendChild(overlay);
        }

        return wrapper;
    },

    hideControls: function() {
        this.showControls = false;
        const overlay = document.querySelector(".fmled-overlay");
        if (overlay) {
            overlay.remove();
        }
        this.updateDom(200);
    },

    createIcon: function(iconFile, type) {
        const icon = document.createElement("button");
        icon.className = "fmled-icon";
        
        const img = document.createElement("img");
        img.src = this.file(iconFile);
        img.className = "fmled-icon-svg";
        icon.appendChild(img);
        
        icon.addEventListener("click", (e) => {
            this.currentType = type;
            this.showControls = true;
            this.updateDom(200);
            e.preventDefault();
        });
        return icon;
    },

    setBrightness: function(type, value) {
        Log.info(`Setting ${type} brightness to ${value}`);
        
        if (type === "led") {
            this.ledBrightness = value;
        } else {
            this.screenBrightness = value;
        }

        const endpoint = type === "led" ? "led" : "backlight";
        const url = `http://${this.config.host}:${this.config.port}/api/${endpoint}/update`;
        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({ brightness: value })
        })
        .then(response => {
            if (response.ok) {
                Log.info(`Successfully set ${type} brightness to ${value}`);
            } else {
                Log.error(`Failed to set ${type} brightness: ${response.status}`);
            }
        })
        .catch(error => {
            Log.error(`Error setting ${type} brightness:`, error);
        });
    },
});
