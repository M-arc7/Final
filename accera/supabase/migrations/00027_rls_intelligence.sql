-- =========================================================
-- INTELLIGENCE: sensitive generated data is recipient or permission scoped.
-- =========================================================

create policy analytics_events_organisation_read on public.analytics_events for select using ((organisation_id is not null and app.has_organisation_permission(organisation_id, 'intelligence.read')) or app.owns_record(actor_id));
create policy recommendations_recipient_or_permission_read on public.recommendations for select using (app.owns_record(recipient_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'intelligence.read')));
create policy predictions_organisation_read on public.predictions for select using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'intelligence.read'));
create policy intelligence_reports_organisation_read on public.intelligence_reports for select using (app.has_organisation_permission(organisation_id, 'intelligence.read'));
