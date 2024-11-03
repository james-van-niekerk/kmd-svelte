<script lang="ts">
    export let onClick: () => void = () => {};

    // Optional: additional props for customization
    export let mainColor: string = "rgb(46, 213, 115)";
    export let mainBgColor: string = "rgba(46, 213, 116, 0.36)";
    export let patternColor: string = "rgba(46, 213, 116, 0.073)";
    export let hueRotate: number = 0;
    export let hoverHueRotate: number = 250;
</script>

<button
    class="console-button"
    style="
    --main-color: {mainColor};
    --main-bg-color: {mainBgColor};
    --pattern-color: {patternColor};
    filter: hue-rotate({hueRotate}deg);
  "
    on:click={onClick}
>
    <slot>Start</slot>
</button>

<style>
    .console-button {
        position: relative;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.5rem;
        background: radial-gradient(
                circle,
                var(--main-bg-color) 0%,
                rgba(0, 0, 0, 0) 95%
            ),
            linear-gradient(var(--pattern-color) 1px, transparent 1px),
            linear-gradient(to right, var(--pattern-color) 1px, transparent 1px);
        background-size:
            cover,
            15px 15px,
            15px 15px;
        background-position:
            center center,
            center center,
            center center;
        border-image: radial-gradient(
                circle,
                var(--main-color) 0%,
                rgba(0, 0, 0, 0) 100%
            )
            1;
        border-width: 1px 0 1px 0;
        color: var(--main-color);
        padding: 1rem 3rem;
        font-weight: 700;
        font-size: 1.5rem;
        transition:
            background-size 0.2s ease-in-out,
            transform 0.1s ease-in-out;
        overflow: hidden;
    }

    .console-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
        );
        transition: all 0.6s;
    }

    .console-button:hover::before {
        left: 100%;
    }

    .console-button:hover {
        background-size:
            cover,
            10px 10px,
            10px 10px;
    }

    .console-button:active {
        filter: hue-rotate(250deg);
        transform: scale(0.95);
    }

    .console-button:active::before {
        left: 100%;
        transition: none;
    }
</style>
