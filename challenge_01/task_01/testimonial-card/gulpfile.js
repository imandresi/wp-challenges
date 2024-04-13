import zip from 'gulp-zip';
import gulp from 'gulp';
import {series, parallel} from 'gulp';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import del from 'del';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve('../dist');
const pluginName = path.parse(path.basename(__dirname)).name;
const zipFilename = `${pluginName}.zip`;
const temporaryFolder = 'tmp'
const pluginDir = `${distPath}/${temporaryFolder}/${pluginName}`;

const copyBuildFolder = () => {
	fs.mkdir(pluginDir, {recursive:true}, () => {});
	return gulp.src(['./build/**/*', '!./build/**/*.map'], {base: './build'})
		.pipe(gulp.dest(`${pluginDir}/build`));
} ;

const copyRootFolder = () => {
	return gulp.src('*.php')
		.pipe(gulp.dest(`${pluginDir}`));
};

const buildZip = () => {
	return gulp.src(`${distPath}/${temporaryFolder}/**/*`)
		.pipe(zip(zipFilename))
		.pipe(gulp.dest(distPath));
};

const removeTmpFolder = () => {
	return del([`${distPath}/${temporaryFolder}/**`], {force: true})
};

const cleanDistFolder = () => {
	return del([`${distPath}/**`], {force: true})
}

const process = series(
	cleanDistFolder,
	copyBuildFolder,
	copyRootFolder,
	buildZip,
	removeTmpFolder
);
export default process;
