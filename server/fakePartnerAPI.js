// The main hypothesis is that there is an external Partner API that allows
// you to add new employees.
// This is just a fake API. In the real app, each partner would have it's own external API.
export function fakePartnerAPI(employeeData) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log('Message from partner API. Added new employee.');
      console.log(employeeData);
      res();
    }, 2000);
  });
}
