// The main hypothesis is that there is an external Partner API that allows
// you to add new employees.

// This is just a mock API that uses the Next.js feature to create endpoints in the
// folder /pages/api. In the real app, each partner would have it's own external API.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const employeeData = req.body;
    res.status(200).json(employeeData);
  } else {
    res.status(405).end();
  }
}
