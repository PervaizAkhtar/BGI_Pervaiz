
var userDataViewModel;
var userRepositoriesViewModel;

function getUserData(response)
{
    userDataViewModel =
    {
        login: response.login,
        location: response.location,
        repos_url: response.repos_url
    };

    return userDataViewModel;
}

function getUserRepositories(id,stargazers_count, name, description,collaborators_url,teams_url,watchers_count)
{

   userRepositoriesViewModel = {
       id: id,
       stargazers_count:stargazers_count,
       name: name,
       description: description,
       collaborators_url: collaborators_url,
       teams_url: teams_url,
       watchers_count : watchers_count
    };

    return userRepositoriesViewModel;
}

function getUserDataCallBackFunction(data)
{
    getUserData(data);

    $("#login").text(userDataViewModel.login);
    $("#location").text(userDataViewModel.location);
    $("#repos_url").text(userDataViewModel.repos_url);

    $.getJSON(userDataViewModel.repos_url, getUserRepositoriesCallBackFunction);
}

function sortCallBackFunction(a, b) {
    return parseInt(a.stargazers_count)  -  parseInt(b.stargazers_count);
}

function getUserRepositoriesCallBackFunction(data)
{
    var userRepositories = ([]);
    
    $.each(data, function (index, element)
    {
        var item = getUserRepositories(element.id,element.stargazers_count, element.name, element.description,element.collaborators_url,element.teams_url,element.watchers_count);

        userRepositories.push(item);
    });

    userRepositories.sort(sortCallBackFunction).reverse();

    var topFiveUserRepositories = userRepositories.slice(0, 5);

    for(var i=0; i<topFiveUserRepositories.length;i++)
    {
        var item = topFiveUserRepositories[i];

        var table = $("#tableUserRepository");
        
        table.find("tr:gt(5)").remove();

        var row = "<tr>" +
                "<td> '" + item.id + "'   </td>" +
                "<td> '" + item.stargazers_count + "' </td>" +
                "<td> '" + item.name + "' </td>" +
                "<td> '" + item.description + "' </td>" +
                "<td> '" + item.watchers_count + "' </td>" +
                "<td> '" + item.collaborators_url + "' </td>" +
        "</tr>";
        
        table.append(row);
    }
}


$(function () {
    $("#userInfo").hide();
    $("#userRepositoryInfo").hide();
    $("#btnSubmit").click(function () {
        var getUrl = "https://api.github.com/users/";
        var userName = $("#txtUserName").val();

        if (userName) {
            $("#userInfo,#userRepositoryInfo").toggle();
            getUrl += userName;
            $.getJSON(getUrl, getUserDataCallBackFunction);
        }
        else {
            alert("Enter UserName");
        }
    });

});
