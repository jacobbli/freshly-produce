<template>
  <NavBar/>
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

</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',

  components: {
    NavBar,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
   margin: 0px;
   background-color: #F8F9FA;
}
</style>
