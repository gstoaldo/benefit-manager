export default function handler(req, res) {
  if (req.method === 'POST') {
    const employeeData = req.body;
    res.status(200).json(employeeData);
  } else {
    res.status(405);
  }
}
