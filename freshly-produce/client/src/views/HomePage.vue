<template>
  <NavBar />
     
  <div class="p-grid p-p-4">

    <div class="p-col-3">
        <Card>
        <template #header>
            <img alt="user header" src="demo/images/usercard.png">
        </template>
        <template #title>
            Advanced Card
        </template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </template>
      </Card>
    </div>
    <div class="p-col-3">
    <Card>
        <template #header>
            <img alt="user header" src="demo/images/usercard.png">
        </template>
        <template #title>
            Advanced Card
        </template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </template>
      </Card>
    </div>
    <div class="p-col-3">
    <Card>
        <template #header>
            <img alt="user header" src="demo/images/usercard.png">
        </template>
        <template #title>
            Advanced Card
        </template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </template>
      </Card>
    </div>
    <div class="p-col-3">
    <Card>
        <template #header>
            <img alt="user header" src="demo/images/usercard.png">
        </template>
        <template #title>
            Advanced Card
        </template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </template>
      </Card>
    </div>
  </div>

</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'HomePage',
  components: {
    NavBar,

  },
  data() {
		return {
      listProduct:[]
		}
	}
}
</script>

<style>

</style>