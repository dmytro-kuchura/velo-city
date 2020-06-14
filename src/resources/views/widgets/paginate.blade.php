@if ($paginator->hasPages())
    <div class="row">
        <div class="col-12">
            <div class="pagination-bar">
                <ul>
                    @if ($paginator->onFirstPage())
                        <li>
                            <a href="{{ str_replace('?page=1', '', $paginator->previousPageUrl()) }}"
                               aria-disabled="true">
                                <i class="fa fa-angle-left"></i>
                            </a>
                        </li>
                    @else
                        <li>
                            <a href="{{ str_replace('?page=1', '', $paginator->previousPageUrl()) }}">
                                <i class="fa fa-angle-left"></i>
                            </a>
                        </li>
                    @endif

                    @foreach ($elements as $element)
                        @if (is_array($element))
                            @foreach ($element as $page => $url)
                                @if ($page == $paginator->currentPage())
                                    <li class="active">
                                        <a href="javascript:void(0)">{{ $page }}</a>
                                    </li>
                                @else
                                    <li>
                                        <a href="{{str_replace('?page=1', '', $url)}}">{{ $page }}</a>
                                    </li>
                                @endif
                            @endforeach
                        @endif
                    @endforeach

                    @if ($paginator->hasMorePages())
                        <li>
                            <a href="{{ $paginator->nextPageUrl() }}">
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    @else
                        <li>
                            <a href="{{ $paginator->nextPageUrl() }}">
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
@endif
