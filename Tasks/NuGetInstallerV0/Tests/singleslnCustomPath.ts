import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');
import util = require('./NugetMockHelper');

let taskPath = path.join(__dirname, '..', 'nugetinstaller.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
let nmh: util.NugetMockHelper = new util.NugetMockHelper(tmr);

nmh.setNugetVersionInputDefault();
tmr.setInput('solution', 'single.sln');
tmr.setInput('nuGetPath', 'c:\\custompath\\nuget.exe');

let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    "osType": {},
    "checkPath": {
        "c:\\custompath\\nuget.exe": true,
        "c:\\agent\\home\\directory\\single.sln": true
    },
    "which": {},
    "exec": {
        "c:\\custompath\\nuget.exe restore -NonInteractive c:\\agent\\home\\directory\\single.sln": {
            "code": 0,
            "stdout": "NuGet output here",
            "stderr": ""
        }
    },
    "exist": {},
    "stats": {
        "c:\\agent\\home\\directory\\single.sln": {
            "isFile": true
        }
    }
};
nmh.setAnswers(a);

nmh.registerNugetUtilityMock(["c:\\agent\\home\\directory\\single.sln"]);
nmh.registerDefaultNugetVersionMock();
nmh.registerToolRunnerMock();

tmr.run();
