
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add("_touch")
} else {
    document.body.classList.add("_pc")
}

// Скролл при клике
const menuLinks = document.querySelectorAll(".TM_link[data-goto]")
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto)
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight - 80;
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            })
            e.preventDefault()
        }
    }
}
 
//Появление анимации при скролле

    const AnimItems = document.querySelectorAll('._Anim-Items')
    let ty = false

    if (AnimItems.length > 0) {
        window.addEventListener('scroll', AnimOnScroll);
        function AnimOnScroll(params) {
            for (let index = 0; index < AnimItems.length; index++){
                const AnimItem = AnimItems[index];
                const AnimItemsHeight = AnimItem.offsetHeight;
                const AnimItemsOffset = offset(AnimItem).top;
                const AnimStart = 4;

                let AnimItemPoint = window.innerHeight - AnimItemsHeight / AnimStart;

                if (AnimItemsHeight > window.innerHeight) {
                    AnimItemPoint = window.innerHeight - window.innerHeight / AnimStart;
                }
                if ((scrollY > AnimItemsOffset - AnimItemPoint) && scrollY < (AnimItemsOffset + AnimItemsHeight)) {
                    AnimItem.classList.add('_active');
                }
            }
        }
        AnimOnScroll()
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                ScrollLeft = window.scrollX || document.documentElement.scrollLeft,
                ScrollTop = window.scrollY || document.documentElement.scrollTop;
            return{top: rect.top + ScrollTop , left: rect.left + ScrollLeft}
        }
        AnimOnScroll();
    }

// Меню бургер, добавление класса при клике
const burgerIcon = document.querySelector('.TM_BurgerIcon');
const TMlist = document.querySelector('.TM_nav');

burgerIcon.addEventListener('click', function() {
    burgerIcon.classList.toggle('TM_active');
    TMlist.classList.toggle('TM_active');
});

// соединение блоков
function getPosBlocks(e, startBlockName, finishBlockName) {
    const startBlock = document.querySelector(startBlockName)
    const finishBlock = document.querySelector(finishBlockName)

    const svgBlock = e.getBoundingClientRect()

    const startBlockRect = startBlock.getBoundingClientRect()
    const finishBlockRect = finishBlock.getBoundingClientRect()
    console.log(startBlockRect)
    console.log(finishBlockRect)

    const start = {
        x: startBlockRect.width/2 + startBlockRect.left - svgBlock.left,
        y: 5
    }
    const finish = {
        x: finishBlockRect.width/2 + finishBlockRect.left - svgBlock.left,
        y: svgBlock.height - 5
    }
    console.log(`start: ${start}, finish: ${finish}`)

    drawSvgLine(e, start, finish)
}

function drawSvgLine(block, start, finish) {
    const svg = block.querySelector('svg')
    const line0 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    function setLine(line, x1, y1, x2, y2) {
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', '4');
        line.setAttribute('stroke-linecap', 'round');

        svg.appendChild(line);
    }

    setLine(line0, start.x, start.y-5, start.x, 23)
    setLine(line1, start.x, start.y+20, finish.x, finish.y-20)
    setLine(line2, finish.x, finish.y-20, finish.x, finish.y)
}

const svgs1 = document.querySelectorAll('.svg1')

svgs1.forEach(e => {
    // drawSvgLine(e)
    getPosBlocks(e, e.dataset.start, e.dataset.finish)
});

















