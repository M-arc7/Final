-- =========================================================
-- CONTENT: published material is public; drafts and media remain owner/organisation scoped.
-- =========================================================

grant select on public.content_posts, public.articles to anon;
create policy content_posts_published_owner_or_permission_read on public.content_posts for select using (status = 'published' or app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.read')));
create policy content_posts_owner_or_permission_write on public.content_posts for all using (app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage'))) with check (app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage')));
create policy articles_published_owner_or_permission_read on public.articles for select using (status = 'published' or app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.read')));
create policy articles_owner_or_permission_write on public.articles for all using (app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage'))) with check (app.owns_record(author_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage')));
create policy content_media_owner_or_permission_read on public.content_media for select using (app.owns_record(owner_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.read')));
create policy content_media_owner_or_permission_write on public.content_media for all using (app.owns_record(owner_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage'))) with check (app.owns_record(owner_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'content.manage')));
create policy announcements_organisation_read on public.announcements for select using (app.has_organisation_permission(organisation_id, 'content.read'));
create policy announcements_organisation_write on public.announcements for all using (app.owns_record(author_id) and app.has_organisation_permission(organisation_id, 'content.manage')) with check (app.owns_record(author_id) and app.has_organisation_permission(organisation_id, 'content.manage'));
create policy content_feed_recipient_read on public.content_feed_items for select using (app.owns_record(recipient_id));
