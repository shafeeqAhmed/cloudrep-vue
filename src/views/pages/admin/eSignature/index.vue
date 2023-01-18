<template>
    <div>
        <label for="file-upload" class="custom-file-upload">
            Open PDF
        </label>
        <input id="file-upload" type="file" @change="openDocument" class="btn" />
        <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
    </div>
</template>

<script>
import PSPDFKitContainer from "./PSPDFKitContainer.vue";
import PSPDFKit from "pspdfkit";

export default {
    data() {
        return {
            pdfFile: this.pdfFile || "./document.pdf",
        };
    },
    /**
     * Render the `PSPDFKitContainer` component.
     */
    components: {
        PSPDFKitContainer,
    },
    /**
     * Our component has two methods — one to check when the document is loaded, and the other to open the document.
     */
    methods: {
        handleLoaded(instance) {
            console.log("PSPDFKit has loaded: ", instance);
            // Do something.
        },

        openDocument(event) {
            // To access the Vue.js instance data properties, use `this` keyword.
            if (this.pdfFile && this.pdfFile.startsWith('blob:')) {
                window.URL.revokeObjectURL(this.pdfFile);
            }
            this.pdfFile = window.URL.createObjectURL(event.target.files[0]);


            const widget = new PSPDFKit.Annotations.WidgetAnnotation({
                pageIndex: 0,
                boundingBox: new PSPDFKit.Geometry.Rect({
                    left: 200,
                    top: 300,
                    width: 250,
                    height: 150
                }),
                formFieldName: "My signature form field",
                id: PSPDFKit.generateInstantId()
            });
            const formField = new PSPDFKit.FormFields.SignatureFormField({
                name: "My signature form field",
                annotationIds: PSPDFKit.Immutable.List([widget.id])
            });
            instance.create([widget, formField]);
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

body {
    margin: 0;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background: #4A8FED;
    padding: 10px;
    color: #fff;
    font: inherit;
    font-size: 16px;
    font-weight: bold;
}
</style>