export async function test() {
  console.log('test')
}

export const checkDeliverFirstLoginStatus = async () => {
  const { copywriting, process_exec_code, output_key1 } = await execProcess(
    'PROCESS.check_deliver_first_login_status',
    {
      login_type: 'passport'
    }
  );

  if (process_exec_code !== 0) {
    throw new Error(copywriting);
  }

  return output_key1.value === '0';
};
export const checkDeliverFirstLoginStatus2 = async () => {
  const { copywriting, process_exec_code, output_key1 } = await execProcess(
    'PROCESS.check_deliver_first_login_status',
    {
      login_type: 'passport'
    }
  );

  if (process_exec_code !== 0) {
    throw new Error(copywriting);
  }

  return output_key1.value === '0';
};


const execProcess = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        copywriting: 'Success!',
        output_key1: {
          value: '22'
        },
        process_exec_code: 0,
        process_id: '7041845153434196737'
      });
    }, 1000);
  })
}
