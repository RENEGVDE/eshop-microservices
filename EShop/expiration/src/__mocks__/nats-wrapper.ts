export const natsWrapper = {
  client: {
    publish: (channel: string, data: string, callback: () => void) => {
      callback();
    },
  },
};
