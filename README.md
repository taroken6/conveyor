install 'react-router-dom', 'react-svg' into peer dependencies only; otherwise breaks Link/Router config

Add svg image within your own project file structure in order to have "Detail Attribute Edit Button" appear: /public/static/img/edit.svg

### `npm run dev

### `npm run lib` creates transpiled code for use in other projects

### `npm run build-tar` => makes the tar file, cleans up past tar files of same version. To use this, make ./buildFile executable by typing: `chmod +x buildFile` in /conveyor directory

After having created tarball file, change the package.json in your main project (where conveyor imported) to reflect the path of the tarball file:

"devDependencies": {
    ...
    "conveyor": "file:../conveyor/conveyor-1.5.0.tgz",
    ...
}
