export const sendEvent = (type: string, payload: any) => {
  const event = {
    type,
    payload,
    timestamp: Date.now()
  };

  console.log('event', event);

  fetch('/api/sendEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
    .then((data) => {
      console.log('Server response:', data.status);
    })
    .catch((error) => {
      console.error('Server response:', error);
    });
};
