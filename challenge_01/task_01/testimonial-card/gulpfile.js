import zip from 'gulp-zip';
import gulp from 'gulp';
import {series, parallel} from 'gulp';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import del from 'del';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve('../dist');
const pluginName = path.parse(path.basename(__dirname)).name;
const zipFilename = `${pluginName}.zip`;
const temporaryFolder = 'tmp';
const outputFolder = 'build';
const pluginDir = `${distPath}/${temporaryFolder}/${pluginName}`;

function copyBinaryFiles(sourceDir, destDir) {
	fs.cpSync(sourceDir, destDir, {recursive: true});

	return Promise.resolve();
}

function zipDirectory(sourceDir, outPath) {
	const archive = archiver('zip', { zlib: { level: 9 }});
	const stream = fs.createWriteStream(outPath);

	return new Promise((resolve, reject) => {
		archive
			.directory(sourceDir, false)
			.on('error', err => reject(err))
			.pipe(stream)
		;

		stream.on('close', () => resolve());
		archive.finalize();
	});
}
const copyBuildFolder = () => {
	fs.cpSync(
		path.resolve(`./${outputFolder}`),
		`${pluginDir}/${outputFolder}`,
		{recursive: true}
	);

	return Promise.resolve();
};

const copyRootFolder = () => {
	return gulp.src('*.php')
		.pipe(gulp.dest(`${pluginDir}`));
};

const buildZip = () => {
	return  zipDirectory(
		`${distPath}/${temporaryFolder}`,
		`${distPath}/${zipFilename}`
	);
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
