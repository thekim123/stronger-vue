<template>
  <header class="navbar">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/tasks">Tasks</router-link></li>
        <li><a href="#">Goals</a></li>
        <li><router-link to="/share">ShareYourProgress</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>


.navbar {
  background-color: #42b983;
  padding: 15px 0;
}

nav ul {
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: #2c3e50;
}
</style>
