<template>
  <nav>
    <router-link to="/estudiantes">Consultar Estudiantes</router-link>  | 
    <router-link to="/estudiante-formulario"> Formulario Estudiante</router-link>
  </nav>
</template>

<style scoped>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>