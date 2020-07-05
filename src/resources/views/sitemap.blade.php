<?= '<' . '?' . 'xml version="1.0" encoding="UTF-8"?>' . "\n"; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    @if (!empty($pages))
        @foreach ($pages as $page)
            <url>
                <loc>{{ url(str_replace('main', '', $page->slug)) }}</loc>
                <lastmod>{{ $page->created_at->toAtomString() }}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1</priority>
            </url>
        @endforeach
    @endif

    @if (!empty($news))
        @foreach ($news as $obj)
            <url>
                <loc>{{ url(route('news.inner', ['alias' => $obj->alias])) }}</loc>
                <lastmod>{{ $obj->created_at->toAtomString() }}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1</priority>
            </url>
        @endforeach
    @endif

    @if (!empty($items))
        @foreach ($items as $item)
            <url>
                <loc>{{ url(route('shop.item', ['alias' => $item->alias, 'id' => $item->id])) }}</loc>
                <lastmod>{{ $item->updated_at->toAtomString() }}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1</priority>
            </url>
        @endforeach
    @endif
</urlset>
