AFRAME.registerComponent("university-building", {

    init: function () {

        const root = this.el;

        const mainBlock = document.createElement("a-box");
        mainBlock.setAttribute("width", 4);
        mainBlock.setAttribute("height", 1.5);
        mainBlock.setAttribute("depth", 2);
        mainBlock.setAttribute("position", "0 0.75 0");
        mainBlock.setAttribute("color", "#d8d8d8");

        root.appendChild(mainBlock);

        const centerBlock = document.createElement("a-box");
        centerBlock.setAttribute("width", 1.5);
        centerBlock.setAttribute("height", 2.2);
        centerBlock.setAttribute("depth", 2.2);
        centerBlock.setAttribute("position", "0 1.1 0");
        centerBlock.setAttribute("color", "#c0c0c0");

        root.appendChild(centerBlock);

        const roof = document.createElement("a-box");
        roof.setAttribute("width", 4.2);
        roof.setAttribute("height", 0.15);
        roof.setAttribute("depth", 2.2);
        roof.setAttribute("position", "0 1.6 0");
        roof.setAttribute("color", "#8b0000");

        root.appendChild(roof);

        for (let x = -1.5; x <= 1.5; x += 0.5) {

            const windowBox = document.createElement("a-box");

            windowBox.setAttribute("width", 0.25);
            windowBox.setAttribute("height", 0.25);
            windowBox.setAttribute("depth", 0.05);

            windowBox.setAttribute(
                "position",
                `${x} 0.9 1.03`
            );

            windowBox.setAttribute("color", "#4fc3f7");

            root.appendChild(windowBox);
        }
    }
});