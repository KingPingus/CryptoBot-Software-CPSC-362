<script>
  export let form = {};
</script>

<div class="login-container">
  <div class="login-form">
    <h2>Crypto Market Bot</h2>
    <form method="POST">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required value="admin@gmail.com"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required value="password"/>
      </div>
      <button type="submit" class="dark-gray-button">Log In</button>
    </form>

    {#if form?.message}
      <p class="error-message">{form.message}</p>
    {/if}
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    font-family: sans-serif;
  }

  .login-form {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    transition: box-shadow 0.3s ease;
  }

  .login-form:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .dark-gray-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }

  .dark-gray-button:hover {
    background-color: #555;
  }

  .error-message {
    color: #dc3545;
    text-align: center;
    margin-top: 1rem;
  }
</style>