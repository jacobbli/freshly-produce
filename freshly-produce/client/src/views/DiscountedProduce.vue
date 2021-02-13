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
                    <img v-if="productPhotoEmpty" alt="user header" :src="slotProps.data.product_photo" />
                    <img v-else alt="user header" :src="slotProps.data.product_photo"/>
                    <div class="product-name">{{slotProps.data.product_name}}</div>
                    <div>Expiry Date: {{slotProps.data.expiration_date}}</div>
                    <div class="product-description">{{slotProps.data.product_description}}</div>
                </div>
                <div class="product-grid-item-bottom">
                    <span class="product-price">${{slotProps.data.product_price}}</span>
                    <Button icon="pi pi-shopping-cart" label="Add to Cart" @click="addToCart(slotProps.data.product_id)"/>
                </div>
            </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import { getDiscountedProducts } from '../api/DiscountedProductApi.js'
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
        },
        updateDiscountedProductsList() {
            getDiscountedProducts().then(res => {
                res.forEach((item) => {
                  if(item.product_photo == null){
                    item.product_photo = "/images/temp/"+this.listphotos[Math.floor(Math.random() * 6)]
                  }
                  let indexT = item.expiration_date.indexOf("T")
                  item.expiration_date = item.expiration_date.substring(0,indexT)
                })

                this.listProduct = res;
            }).catch(err => {
                console.error(err);
            });
        },
        addToCart(productID){
            let item = this.listProduct.filter(item => item.product_id == productID)
            this.myCart = JSON.parse(localStorage.getItem('myCart'));
            this.myCart.push(item[0])
            localStorage.setItem('myCart',JSON.stringify(this.myCart))
            this.$emit('updateCartParent', this.myCart)
        }
    },
    data() {
		return {
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            productPhotoEmpty: false,
            sortOptions: [
                {label: 'Price High to Low', value: '!product_price'},
                {label: 'Price Low to High', value: 'product_price'},
            ],
            listphotos:[
              "blueberries.jpg",
              "broccoli.jpg",
              "carrots.jpg",
              "fruit.jpg",
              "root.jpg",
              "tuber.jpg"
            ],
            myCart: [],
            listProduct: []
        }
    },
    mounted: function() {
        this.updateDiscountedProductsList();
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