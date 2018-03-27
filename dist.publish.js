/**
 * Create Date: 2018-03-23
 * Author: Kuang
 * Description: 前端一建打包部署到服务器
 * 把打包后的静态资源文件放置服务器
**/

module.export = function (){
	let O 			= 'retailer-front',
		Q 			= require('q'),
		del 		= require('del'),
		gulp 		= require('gulp'),
		zip			= require('gulp-zip'),
		node_ssh	= require('node-ssh'),
		colors 		= require('colors/safe'),
		dateFormat 	= require('dateformat'),
		argv 		= process.argv,
		exec		= require('child_process').exec,
		IPs			= [{
			host: '123.56.29.106',
            post: 22,
            user: 'root',
            dist: '/root',
            privateKey: '/Users/Kuang/.ssh/id_rsa'
		}],
		SERVER 		= {
			test: {
				type: 'test',
                host: '172.17.15.174',
                port: 22,
                user: '',
                dist: '/opt/webapps',
                privateKey: ''
			},
			prod: {
				type: 'prod',
                host: '172.17.15.160',
                port: 22,
                user: '',
                dist: '/opt/webapps',
                privateKey: ''
			}
		},
		center 		= new node_ssh(),
		zipfile 	= O + '-' + dateFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss') + '.zip';

		if ('publish' !== argv[2]) {
			process.stdout.write(colors.green('Do you mean "publish"?\n'));
            return
		}

		if (!SERVER[argv[3]]) {
			process.stdout.write(colors.green('\x20SERVER REQUIRED!\n'));
            process.stdout.write(colors.blue('\x20-node dist.publish.js test\n'));
            process.stdout.write(colors.blue('\x20-node dist.publish.js prod\n'));
            return
		}

		IPs.push(SERVER[argv[3]]);

		// 第一步，删除zip目录
        var DELFILE = function() {
            var deferred = Q.defer();
            process.stdout.write(colors.green('ON STEPS: \n'));
            process.stdout.write(colors.green('1. zip -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 del dist ... \n'));
            del(['zip'], {force: true}, function (error, stdout, stderr) {
                process.stdout.write(colors.green('\x20\x20\x20 del zip successfully! \n'));
                deferred.resolve(true)
            })
            return deferred.promise
        }

        // 第二步，重新打包生成dist目录
        var BUILD = function () {
        	var defered = Q.defer();
	        process.stdout.write(colors.green('2、: build -> \n'));
	        process.stdout.write(colors.blue('\x20\x20\x20 build project...\n'));
	        exec('npm run build', function(error, stdout, stderr) {
	            process.stdout.write(colors.green('\x20\x20\x20 success\n'));
	            defered.resolve(true);
	        });
	        return defered.promise;
        }

        // 第三步，将打包后dist目录下的文件copy到zip，并命名retailer-front
        var COPYTOZIP = function () {
        	var deferred = Q.defer();
            process.stdout.write(colors.green('3. copy -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 copy...\n'));
            gulp.src(['./dist/**'])
                .pipe(gulp.dest('zip/retailer-front'))
                .on('finish', function () {
                    process.stdout.write(colors.green('\x20\x20\x20 copy successfully!\n'));
                    deferred.resolve(true);
                })
                .on('error', function (error) {
                    deferred.reject(new Error(error));
                })
            return deferred.promise
        }

        // 第四步，打包压缩zip文件夹里的retailer-front
        var ZIPFILE = function () {
        	var deferred = Q.defer();
            process.stdout.write(colors.green('4. zipfile -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 zip packing...\n'));
            gulp.src([
                'zip/**'
            ])
            .pipe(zip(zipfile))
            .pipe(gulp.dest('zip'))
            .on('finish', function () {
                process.stdout.write(colors.green('\x20\x20\x20 zip packed successfully!\n'));
                deferred.resolve(zipfile);
            })
            .on('error', function () {
                process.stdout.write(colors.red('\x20\x20\x20 zip packed field!\n'));
                deferred.reject(new Error(error));
            });
            return deferred.promise;
        }

        // 第五步，上传至中控
        var UPLOAD = function (file) {
        	var deferred = Q.defer();
            process.stdout.write(colors.green('5. upload: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 upload ' + file + ' to ' + IPs[0].host + '...\n'));
            exec('scp ./zip/' + file + ' ' + IPs[0].user + '@' + IPs[0].host + ':' + IPs[0].dist, function (error, stdout, stderr) {
                process.stdout.write(colors.blue('\x20\x20\x20 upload to ' + IPs[0].host + 'successfully! \n'));
                deferred.resolve(file)
            })
            return deferred.promise;
        }

        // 第六步，连接中控机
        var CONNECT = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('6. login: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 login ' + IPs[0].host + '...\n'));
            center.connect({
                host: IPs[0].host,
                port: IPs[0].port,
                username: IPs[0].user,
                privateKey: IPs[0].privateKey
            }).then( () => {
                process.stdout.write(colors.blue('\x20\x20\x20 welcome to ' + IPs[0].host + '!\n'));
                deferred.resolve(file);
            })
            return deferred.promise
        }

        // 第七步，解压文件
        var UNZIPFILE = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('7. unzip: \n'));
            center.exec('unzip -o ' + IPs[0].dist + '/' + file)
            .then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 unzip successfully! \n'));
                deferred.resolve(file);
            });
            return deferred.promise;
        }

        // 第八步，将文件拷贝到服务器
        var COPYTOSERVER = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('8. copy to server: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 copy '+ O +' to ' + IPs[1].host + '!\n'));
            center.exec('scp -r ' + IPs[0].dist + '/' + O + ' ' + IPs[1].host + ':' + IPs[1].dist)
            .then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 copy successfully!\n'));
                deferred.resolve(file);
            });
            return deferred.promise;
        }

        // 第九步，删除打包文件
        var DELZIPSERVERFILE = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('9. del zip.file: \n'));
            center.exec('rm -rf ' + file + ' ' + O + '/').then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 del successfully!\n'));
                deferred.resolve(true);
            });
            return deferred.promise;
        }

        // 第十步，成功提示
        var SUCCESS = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('\x20PUBLISH SUCCESSFULLY!\n'));
            deferred.resolve(true);
            return deferred.promise
        }

        // 第十一步，错误统一处理
        var ERROR_CATCH = function (error) {
            process.stdout.write(colors.red('Wrong Message: \n'))
            process.stdout.write(colors.red(error.message + '\n'))
        }

        Q.fcall(DELFILE)
        	.then(BUILD)
        	.then(COPYTOZIP)
        	.then(ZIPFILE)
        	.then(UPLOAD)
            .then(CONNECT)
            .then(UNZIPFILE)
            .then(COPYTOSERVER)
            .then(DELZIPSERVERFILE)
            .then(SUCCESS)
            .catch(ERROR_CATCH)
            .done()
}()