<template>
  <header class="navbar">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
        <li><router-link to="/teams">Find Team</router-link></li>
        <li><router-link to="/my-teams">My Team</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/share">ShareYourProgress</router-link></li>
        <li><router-link to="/goals">Goals</router-link></li>

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
