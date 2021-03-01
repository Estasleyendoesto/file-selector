import { fileSelector } from "./js/fileSelector.js";
import "./style.css";

function printboxes(container, elements)
{
    for(let e = 0; e < elements; e++)
    {
        let div = document.createElement("div");
        div.innerHTML = e;
        container.append(div);
    }
}

printboxes(grid, 24);
fileSelector(grid);