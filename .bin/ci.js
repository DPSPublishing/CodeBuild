const Build = require('github-build');
const spawn = require('child_process').spawn;

const data = {
  repo: 'DPSPublishing/CodeBuild', // (author/repo)
  sha: process.env.COMMIT_SHA, // (commit sha)
  token: process.env.GITHUB_TOKEN, // (github oauth token: https://developer.github.com/v3/oauth)
  label: 'CodeBuild',
  description: 'checking some stuff',
  url: 'http://my-ci-service.com/builds/1', // details url
}


let build = new Build(data);

/* When you call start, a pending status get's added on github (returns a promise) */
build.start()

const child = spawn('npm', ['test'], {
  stdio: 'inherit'
});
child.on('exit', (code) => {
  if (code === 0) {
    /* If things go well, call pass, it will mark change the status to success ✅ (returns a promise) */
    build.pass()
  } else {
    build.fail()
  }
})
