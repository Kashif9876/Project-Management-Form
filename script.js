var jpdbBaseURL = "https://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var connToken = "";
var dbName = "COLLEGE-DB";
var relName = "PROJECT-TABLE";


setBaseUrl(jpdbBaseURL);

function el(id) {
    return document.getElementById(id);
}

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getProjectIdAsJsonObj() {
    var projectId = el("projectId").value.trim();
    var jsonStr = {
        "Project-ID": projectId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    el("projectName").value = record["Project-Name"];
    el("assignedTo").value = record["Assigned-To"];
    el("assignmentDate").value = record["Assignment-Date"];
    el("deadline").value = record["Deadline"];
}

function enableFields() {
    el("projectName").disabled = false;
    el("assignedTo").disabled = false;
    el("assignmentDate").disabled = false;
    el("deadline").disabled = false;
}

function resetForm() {
    el("projectId").value = "";
    el("projectName").value = "";
    el("assignedTo").value = "";
    el("assignmentDate").value = "";
    el("deadline").value = "";

    el("projectId").disabled = false;
    el("projectName").disabled = true;
    el("assignedTo").disabled = true;
    el("assignmentDate").disabled = true;
    el("deadline").disabled = true;

    el("save").disabled = true;
    el("update").disabled = true;
    el("reset").disabled = true;

    el("projectId").focus();
}

function validateData() {
    var projectId = el("projectId").value.trim();
    var projectName = el("projectName").value.trim();
    var assignedTo = el("assignedTo").value.trim();
    var assignmentDate = el("assignmentDate").value;
    var deadline = el("deadline").value;

    if (projectId === "") {
        alert("Project ID missing");
        el("projectId").focus();
        return "";
    }
    if (projectName === "") {
        alert("Project Name missing");
        el("projectName").focus();
        return "";
    }
    if (assignedTo === "") {
        alert("Assigned To missing");
        el("assignedTo").focus();
        return "";
    }
    if (assignmentDate === "") {
        alert("Assignment Date missing");
        el("assignmentDate").focus();
        return "";
    }
    if (deadline === "") {
        alert("Deadline missing");
        el("deadline").focus();
        return "";
    }

    var jsonStrObj = {
        "Project-ID": projectId,
        "Project-Name": projectName,
        "Assigned-To": assignedTo,
        "Assignment-Date": assignmentDate,
        "Deadline": deadline
    };
    return JSON.stringify(jsonStrObj);
}

function getProject() {
    var idVal = el("projectId").value.trim();
    if (idVal === "") {
        return;
    }

    var projectIdJsonObj = getProjectIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, dbName, relName, projectIdJsonObj);
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);

    if (resJsonObj.status === 400) {
        enableFields();
        el("save").disabled = false;
        el("reset").disabled = false;
        el("projectName").focus();
    } else if (resJsonObj.status === 200) {
        el("projectId").disabled = true;
        fillData(resJsonObj);
        enableFields();
        el("update").disabled = false;
        el("reset").disabled = false;
        el("projectName").focus();
    } else {
        alert("JPDB Message (" + resJsonObj.status + "): " + resJsonObj.message);
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, dbName, relName);
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    if (resJsonObj && resJsonObj.status === 200) {
        alert("Data saved successfully!");
    }
    resetForm();
    el("projectId").focus();
}

function updateData() {
    el("update").disabled = true;
    var jsonChg = validateData();
    if (jsonChg === "") {
        el("update").disabled = false;
        return;
    }
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, localStorage.getItem("recno"));
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    if (resJsonObj && resJsonObj.status === 200) {
        alert("Data updated successfully!");
    }
    resetForm();
    el("projectId").focus();
}

el("projectForm").addEventListener("submit", function (e) {
    e.preventDefault();
    getProject();
});

el("projectId").addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        getProject();
    }
});

resetForm();
