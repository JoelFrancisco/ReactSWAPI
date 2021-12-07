"use strict";
exports.__esModule = true;
var PlanetsList = function (_a) {
    var planetsToDisplay = _a.planetsToDisplay, setPlanet = _a.setPlanet, setShowPlanetInformation = _a.setShowPlanetInformation, showPlanetInformation = _a.showPlanetInformation;
    return (React.createElement("div", { className: "flex flex-col w-full justify-between" }, planetsToDisplay && planetsToDisplay.map(function (result) { return (React.createElement("div", { key: result.name, className: "hover:bg-gray-800 min-w-full flex-col justify-around items-center rounded-xl", onClick: function () {
            setPlanet(result);
            setShowPlanetInformation(!showPlanetInformation);
        } },
        React.createElement("div", { className: "font-medium flex justify-around min-w-full \n              flex-col border-2 border-gray-800 p-2 rounded-xl \n              bg-gray-200 text-gray-800" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement("div", { className: "font-bold" }, "Nome:"),
                React.createElement("div", { className: "ml-2" }, result.name)),
            React.createElement("div", { className: "flex justify-center" },
                React.createElement("div", { className: "font-bold" }, "Popula\u00E7\u00E3o:"),
                React.createElement("div", { className: "ml-2" }, result.population)),
            React.createElement("div", { className: "flex justify-center" },
                React.createElement("div", { className: "font-bold" }, "Clima:"),
                React.createElement("div", { className: "ml-2" }, result.climate))))); })));
};
exports["default"] = PlanetsList;
