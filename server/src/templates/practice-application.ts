export const practiceApplicationCreater = ({
  number,
  startDate,
  endDate,
  variant,
  count,
  companyName,
  responsiblePerson,
  email,
  phone,
}: {
  number: number;
  startDate: string;
  endDate: string;
  variant: string;
  count: number;
  companyName: string;
  responsiblePerson: string;
  email: string;
  phone: string;
}) => `<body>
<h1>Приглашение на практику #${number}</h1>
<hr />
<div class="section">Контакты:</div>
<ul>
  <li>Организация: ${companyName}</li>
  <li>Представитель: ${responsiblePerson}</li>
  <li>Почта: <a href="mailto:${email}">${email}</a></li>
  <li>Телефон: <a href="tel:${phone}">${phone}</a></li>
</ul>
<hr />
<div class="section">Практика</div>
<ul>
  <li>Вид практики: ${variant} (${startDate} - ${endDate})</li>
  <li>Количество студентов: ${count}</li>
</ul>
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
  }

  li {
    text-align: left;
    font-size: 16px;
  }
</style>
</body>`;
