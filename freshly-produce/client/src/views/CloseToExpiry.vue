<template>
  <div>
    <DataView :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
              </div>
          </div>
      </template>

      <template #grid="slotProps">
          <div class="p-col-3 p-p-4">
              <Card>
                  <template #header>
                      <img alt="user header" src="/images/temp/carrots.jpg">
                  </template>
                  <template #title>
                      {{slotProps.data.product_name}}
                  </template>
                  <template #content>
                      <i class="pi pi-tag product-category-icon p-pr-2"></i><span class="product-category">{{slotProps.data.product_type}}</span>
                      <h4>Expiry Date: {{slotProps.data.expiration_date}}</h4>
                      <span class="product-price p-pr-4">${{slotProps.data.product_price}}</span>
                      <h4>Discount: 10%</h4>
                  </template>
                  <template #footer>
                      <Button icon="pi pi-shopping-cart" label="Add to Cart" />
                  </template>
              </Card>
          </div>
      </template>
    </DataView>
  </div>
</template>

<script>
export default {
    methods: {
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        }
    },
    data() {
		return {
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!product_price'},
                {label: 'Price Low to High', value: 'product_price'},
            ],
            listProduct: [
                {
                    product_name: "Sub",
                    product_type: "Food",
                    product_price: 5.12,
                    expiration_date: "2021-02-07"
                },
                {
                    product_name: "Pear",
                    product_type: "Food",
                    product_price: 11.12,
                    expiration_date: "2021-01-07"
                },
                {
                    product_name: "Berries",
                    product_type: "Food",
                    product_price: 15.12,
                    expiration_date: "2021-01-17"
                },
                {
                    product_name: "Oranges",
                    product_type: "Food",
                    product_price: 9.12,
                    expiration_date: "2021-02-02"
                },
                {
                    product_name: "Apple",
                    product_type: "Food",
                    product_price: 7.12,
                    expiration_date: "2021-02-01"
                },
                {
                    product_name: "Broccoli",
                    product_type: "Food",
                    product_price: 14.12,
                    expiration_date: "2021-02-04"
                },
                {
                    product_name: "Sub",
                    product_type: "Food",
                    product_price: 8.12,
                    expiration_date: "2021-02-06"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 6.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 9.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 10.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 9.45,
                    expiration_date: "2021-01-18"
                }
            ]
        }
    }
}
</script>