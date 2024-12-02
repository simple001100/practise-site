export const distributionApplicationCreater = () => `  <body>
<h1>
  Приглашаем вас посетить наш сайт и ознакомиться с уникальными
  возможностями, которые мы предлагаем!
</h1>
<hr />
<div class="section">
  Наши услуги и продукты разработаны с учетом самых передовых технологий и
  инновационных решений. Мы стремимся предоставить вам удобство,
  эффективность и надежность во всем, что мы делаем.
</div>
<div class="container">
  <a href="http:localhost:3000">
    <span>Перейти</span>
  </a>
</div>

<style>
  * {
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    padding: 60px;
  }

  h1 {
    font-size: 28px;
    text-align: center;
  }

  .section {
    text-align: left;
    font-size: 22px;
    text-align: center;
  }

  .container {
    padding: 20px;
    display: flex;
    justify-content: center;
    width: 100%
  }

  a {
    width: 150px;
    height: 70px;
    background-color: #478ac9;
    border-radius: 20px;
    display: block;
    margin: 0 auto;
       padding-top:20px;
       text-align: center;
  }

  a > span {
    text-decoration: none;
    color: white;
    font-size: 20px;
  }
</style>
</body>`;
