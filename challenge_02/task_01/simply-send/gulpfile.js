import gulp from 'gulp';
import {series, parallel} from 'gulp';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';
import {deleteAsync} from 'del';
import archiver from 'archiver';
import ignore from 'gulp-ignore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = normalizePath(path.resolve('../dist'));
const pluginName = path.parse(path.basename(__dirname)).name;
const zipFilename = `${pluginName}.zip`;
const temporaryFolder = 'tmp';
const pluginDir = `${distPath}/${temporaryFolder}/${pluginName}`;

function normalizePath(strPath) {
    return strPath.replaceAll('\\', '/');
}

function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', {zlib: {level: 9}});
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

const copyPluginFolder = () => {
    return gulp.src(`./**`)
        .pipe(ignore.exclude('node_modules/**'))
        .pipe(ignore.exclude('.gitkeep'))
        .pipe(gulp.dest(`${pluginDir}`));
};

const buildZip = () => {
    return zipDirectory(
        `${distPath}/${temporaryFolder}`,
        `${distPath}/${zipFilename}`
    );
};

const removeTmpFolder = () => {
    return deleteAsync([
        `${distPath}/${temporaryFolder}/**`,
        `${distPath}/${temporaryFolder}`,
    ], {force: true})
};

const cleanPluginFolder = () => {
    return deleteAsync([
        `${pluginDir}/node_modules`,
        `${pluginDir}/*.*`,
        `!${pluginDir}/*.php`,
    ], {force: true});
}

const cleanDistFolder = () => {
    return deleteAsync([`${distPath}/**`], {force: true})
}

const process = series(
    cleanDistFolder,
    copyPluginFolder,
    cleanPluginFolder,
    buildZip,
    removeTmpFolder
);

export default process;
