<template>
    <div>
        <Dialog header="Header" v-model:visible="display" :closable=false class="p-col-6">
            <template #header>
                <h2>Add Discounted Produce</h2>
            </template>
            <div class="p-fluid p-formgrid p-grid ">
                <div class="p-field p-col-12 p-mt-2">
                    <InputText placeholder="Product Name" id="product_name" type="text" />
                </div>
                <div class="p-field p-col-12 ">
                    <Dropdown v-model="selectedProdueType" :options="produeType" optionLabel="type" placeholder="Select a Produce Type" />
                </div>
                <div class="p-field p-col-12">
                    <label for="Upload Photo">Upload Produce Photo</label>
                    <FileUpload name="demo[]" url="./upload" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">$</span>
                        <InputText placeholder="Price" />
                        <span class="p-inputgroup-addon">.00</span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-calendar"></i>
                        </span>
                        <InputText placeholder="YYYY-MM-DD" />
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <InputNumber id="qty" placeholder="Qty" v-model="value20" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <Dropdown v-model="selectedUnitType" :options="unitType" optionLabel="unit" placeholder="Select unit" />
                </div>

            </div>
            <template #footer>
                <div class="p-field p-col-12 p-md-6">
                    <Button label="Cancel" icon="pi pi-times-circle" @click="closeModal" autofocus />
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <Button label="Submit" icon="pi pi-check" @click="submit" autofocus />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
    },
    watch:
    {
        isVisible(newVal){
            this.display = newVal
        }
    },
    data() {
		return {
            date: "",
			display: this.isVisible,
            selectedProdueType: null,
            selectedUnitType: null,
            produeType: [
                {type: 'Root'},
                {type: 'Tuber'},
                {type: 'Fruit'},
                {type: 'Flower'},
                {type: 'Bulb'},
                {type: 'Seed'},
                {type: 'Leave'},
                {type: 'Stem'},
            ],
            unitType: [
                {unit: 'count'},
                {unit: 'kg'},
                {unit: 'g'},
            ]
		}
	},
    methods: {
        closeModal() {
            this.display = false;
            this.$emit('eventname', this.display)
        },
        submit(){
            
        }
    },
}
</script>