const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject('i Coudnt find the file');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write the file');
      resolve('success');
    });
  });
};

const getDogOic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);

    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('File written');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2 : Ready';
};

(async () => {
  try {
    console.log('1 : will get dog pics');
    const x = await getDogOic();
    console.log(x);
    console.log('3 : Done');
  } catch (err) {
    console.log('ERROR');
  }
})();

// console.log('1 : will get dog pics');
/*getDogOic()
  .then((x) => {
    console.log(x);
    console.log('3 : Done');
  })
  .catch((err) => {
    console.log('ERROR');
  });
  */

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
    // fs.writeFile('dog-img.txt', res.body.message, (err) => {
    //   console.log('Random dog image saved to file');
    // });
  })
  .then(() => {
    console.log('Random dog image file saved');
  })
  .catch((err) => {
    console.log(err);
  });
  */
