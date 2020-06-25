<template>
    <div class="row">
        <div class="col-md-12">
            <div class="widget widget-06 has-shadow">
                <div class="widget-header bordered d-flex align-items-center">
                    <h2>Reviews</h2>
                    <div class="widget-options">
                        <div class="dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">
                                <i class="la la-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-item">
                                    <i class="la la-edit"></i>Edit Widget
                                </a>
                                <a href="#" class="dropdown-item faq">
                                    <i class="la la-question-circle"></i>FAQ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="widget-body p-0">
                    <div id="list-group" class="widget-scroll" style="max-height:490px;">
                        <ul class="reviews list-group w-100">
                            <li class="list-group-item">
                                <div class="media">
                                    <div class="media-left align-self-start">
                                        <img src="assets/img/avatar/avatar-02.jpg" class="user-img rounded-circle" alt="...">
                                    </div>
                                    <div class="media-body align-self-center">
                                        <div class="username">
                                            <h4>Brandon Smith</h4>
                                        </div>
                                        <div class="msg">
                                            <div class="stars">
                                                <i class="la la-star"></i>
                                                <i class="la la-star"></i>
                                                <i class="la la-star"></i>
                                                <i class="la la-star"></i>
                                                <i class="la la-star-half-empty"></i>
                                            </div>
                                            <p>
                                                WoW! Amazing Work!
                                            </p>
                                        </div>
                                        <div class="meta">
                                            <span class="mr-3">30 minutes ago - 1 Reply</span>
                                            <a href="#">Reply</a>
                                        </div>
                                    </div>
                                    <div class="media-right pr-3 align-self-center">
                                        <div class="like text-center">
                                            <i class="ion-heart"></i>
                                            <span>12</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        mounted() {
        },
        methods: {

        }
    }
</script>
