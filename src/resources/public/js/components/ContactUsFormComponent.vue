<template>
    <div class="footer-block-contant">
        <form>
            <div class="field">
                <input type="text" placeholder="Name" required>
            </div>
            <div class="field">
                <input type="email" placeholder="Email" required>
            </div>
            <div class="field">
                <textarea name="Message" placeholder="Message" required id="message" cols="5"
                          rows="2"></textarea>
            </div>
            <div class="field">
                <button title="Subscribe" class="btn-color">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cart: this.$store.state,
            }
        }
    }
</script>
