<template>
  <div class="layout-content">
    <h1>Discounted Produce</h1>
    <DataView :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
              </div>
          </div>
      </template>

     <template #grid="slotProps">
          <div class="p-col-12 p-md-4">
            <div class="product-grid-item card">
                <div class="product-grid-item-top">
                    <div>
                        <i class="pi pi-tag product-category-icon"></i>
                        <span class="product-category">TODO: ADD</span>
                    </div>
                    <span>
                        Discount: 10%
                    </span>
                </div>
                <div class="product-grid-item-content">
                    <img alt="user header" :src="slotProps.data.product_photo" style="width: 50%"/>
                    <div class="product-name">{{slotProps.data.product_name}}</div>
                    <div>Expiry Date: {{slotProps.data.expiration_date}}</div>
                    <div class="product-description">{{slotProps.data.product_description}}</div>
                </div>
                <div class="product-grid-item-bottom">
                    <span class="product-price">${{slotProps.data.product_price}}</span>
                    <Button icon="pi pi-shopping-cart" label="Add to Cart" />
                </div>
            </div>
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

<style scoped>
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.edit-button {
  margin-right: .5rem;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

.product-grid-item {
	margin: .5rem;
	border: 1px solid #dee2e6;
}
.product-grid-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  margin: .5rem;
}

.product-grid-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: .5rem;
}

img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 2rem 0;
}

.product-grid-item-content {
  text-align: center;
}

.product-grid-item-content img {
  width: 75%
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
}

.layout-content .card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.product-badge {
    border-radius: 2px;
    padding: .25em .5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;
}

</style>