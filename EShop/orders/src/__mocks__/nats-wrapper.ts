export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (channel: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
