import "../css/fileSelector.css";

export function fileSelector( container )
{
    container.style.userSelect = "none";

    let ox, oy;     // Origen x e y
    let selector;   // Blue box
    let rect = getSize(container);  // Container ¿rectangle?
    let lastTarget;

    // Update rect if window resize
    window.onresize = () => { rect = getSize(container) };

    container.onmousedown = function( event )
    {
        if (!event.button)
        {
            selector = document.createElement("div");
            selector.className = "selector";

            ox = event.pageX;
            oy = event.pageY;

            // Remove "selected" class of all children
            if ( !event.ctrlKey && !event.shiftKey )
                clearSelection(); 

            // Select first element and deselect
            if (event.target != container)
                event.target.classList.toggle("selected");

            // Select all elements of first selected at last target
            if ( event.shiftKey )
                onShiftKey( event );
            else
                lastTarget = event.target; 

            this.prepend(selector);
            document.onmousemove = resize;
        }
    };

    document.onmouseup = function()
    {
        document.onmousemove = undefined;
        selector.remove();
    }

    container.addEventListener('contextmenu', e => {
        e.preventDefault();
    });

    function clearSelection()
    {
        for (let elem of container.children)
            elem.classList.remove("selected");
    }

    function onShiftKey( event )
    {
        let firstElem = false;
        for ( const elem of container.children ){
            if ( elem.classList.contains("selected") && firstElem == false)
                firstElem = true;
            
            if ( firstElem )
                elem.classList.add( "selected" );

            if ( elem == event.target ){
                break;
            }
        }
    }

    function resize( event )
    {   
        // Horizontal and vertical resize
        horizontal(event.pageX);
        vertical(event.pageY);

        for (let element of container.children)
            collision(element);
    }

    function collision( element )
    {
        let rect = getSize(selector);
        let elem = getSize(element);

        // if blue box < 7 not selection
        if ( rect.width > 7 && rect.height > 7 ) {
            // Hitbox
            if ( (rect.x < elem.right && rect.right > elem.x) && (rect.y < elem.bottom && rect.bottom > elem.y) )
            {
                if (element != selector)
                    element.classList.add("selected");
            }
            else
                element.classList.remove("selected");
        }
    }

    function getSize( element )
    {
        return element.getBoundingClientRect();
    }

    function horizontal( x ) {
        if (x > ox) {
            selector.style.left = `${ox}px`;
            selector.style.width = `${x - ox}px`;

            if (x > rect.right)
                selector.style.width = `${rect.right - ox - 2}px`;
        }
        
        // Reverse
        if (x < ox) {
            selector.style.left = `${x}px`;
            selector.style.width = `${ox - x}px`;

            if (x < rect.left) {
                selector.style.left = `${rect.left}px`;
                selector.style.width = `${ox - rect.left}px`;
            }
        }
    }

    function vertical( y ) {
        if (y > oy) {
            selector.style.top = `${oy}px`;
            selector.style.height = `${y - oy}px`;

            if (y > rect.bottom)
                selector.style.height = `${rect.bottom - oy - 2}px`;
        }

        // Reverse
        if (y < oy) {
            selector.style.top = `${y}px`;
            selector.style.height = `${oy - y}px`;

            if (y < rect.top) {
                selector.style.top = `${rect.top}px`;
                selector.style.height = `${oy - rect.top }px`;
            }
        }
    }
}