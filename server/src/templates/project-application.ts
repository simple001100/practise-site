export const projectApplicationCreater = ({
  number,
  name,
  description,
  endDate,
  companyName,
  responsiblePerson,
  email,
  phone,
}: {
  number: number;
  name: string;
  description: string;
  endDate: Date;
  companyName: string;
  responsiblePerson: string;
  email: string;
  phone: string;
}) => `<body>
<h1>Заявка на проект #${number}</h1>
<hr />
<div class="section">Контакты:</div>
<ul>
  <li>Организация: ${companyName}</li>
  <li>Представитель: ${responsiblePerson}</li>
  <li>Почта: <a href="mailto:${email}">${email}</a></li>
  <li>Телефон: <a href="tel:${phone}">${phone}</a></li>
</ul>
<hr />
<div class="section">Проект</div>
<ul>
  <li>Проект: ${name}</li>
  <li>Дедлайн: ${endDate}</li>
  <li>Описание: ${description}</li>
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
