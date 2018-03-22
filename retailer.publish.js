/**
 * Create Date: 2018-01-17
 * Description: 前端一建打包部署到服务器
 * 不同于小屏端只放静态文件，零售户是把放源码放到服务器
**/

module.export = function () {
    'use strict';
    var
        O          = 'retailer-front',
        Q          = require('q'), // "q"
        del        = require('del'), // "del"
        gulp       = require('gulp'), // "gulp"
        zip        = require('gulp-zip'), // "gulp-zip"
        node_ssh   = require('node-ssh'), // "node-ssh"
        colors     = require('colors/safe'), //"colors"
        dateFormat = require('dateformat'),
        argv       = process.argv,
        exec       = require('child_process').exec,
        IPs = [{
            host: '123.56.29.106',
            post: 22,
            user: 'root',
            dist: '/root',
            privateKey: '/Users/Kuang/.ssh/id_rsa'
        }],
        SERVER = {
            'test': {
                type: 'test',
                host: '172.17.15.176',
                port: 22,
                user: '',
                dist: '/opt/webapps',
                privateKey: ''
            },
            'dev': {
                type: 'dev',
                host: '172.17.15.160',
                port: 22,
                user: '',
                dist: '/opt/webapps',
                privateKey: ''
            }
        },
        center  = new node_ssh(),
        zipfile = O + '-' + dateFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss') + '.zip';

        // 判断指令是否正确
        if ('publish' !== argv[2]) {
            process.stdout.write(colors.green('Do you mean "publish"?\n'));
            return
        }

        if (!SERVER[argv[3]]) {
            process.stdout.write(colors.green('\x20SERVER REQUIRED!\n'));
            process.stdout.write(colors.blue('\x20-node retailer.publish.js test\n'));
            process.stdout.write(colors.blue('\x20-node retailer.publish.js dev\n'));
            return
        }

        IPs.push(SERVER[argv[3]]);

        // 第一步，删除压缩包
        var DELFILE = function() {
            var deferred = Q.defer();
            process.stdout.write(colors.green('ON STEPS: \n'));
            process.stdout.write(colors.green('1. del -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 del zip ... \n'));
            del(['zip'], {force: true}, function (error, stdout, stderr) {
                process.stdout.write(colors.green('\x20\x20\x20 del zip successfully! \n'));
                deferred.resolve(true)
            })
            return deferred.promise
        }

        // 第二步，文件拷贝
        var COPYFILE = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('2. copy -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 copy...\n'));
            gulp.src(['./**', '!dist/**', '!retailer.publish.js', '!node_modules/**'])
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

        // 第三步，删除gulp遗留的坑，node_modules空文件夹
        var DELMODULES = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('3、del: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 del node_modules/...\n'));
            del([
                'zip/retailer-front/node_modules'
            ], {force: true}, function () {
                process.stdout.write(colors.green('\x20\x20\x20 del node_modules/ successfully!\n'));
                deferred.resolve(true);
            });
            return deferred.promise;
        }

        // 第四步，压缩文件
        var ZIPFILE = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('4. zip -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 zip packing... \n'));
            gulp.src([
                'zip/**',
                '!zip/retailer-front/doc/**/*'
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

        // 第五步，将压缩文件上传至中控
        var UPLOADFILE = function (file) {
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
            .then(COPYFILE)
            .then(DELMODULES)
            .then(ZIPFILE)
            .then(UPLOADFILE)
            .then(CONNECT)
            .then(UNZIPFILE)
            .then(COPYTOSERVER)
            .then(DELZIPSERVERFILE)
            .then(SUCCESS)
            .catch(ERROR_CATCH)
            .done()
}()