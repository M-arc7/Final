-- =========================================================
-- FINANCE: read is relationship/permission scoped; client writes are default-deny.
-- Payment providers and financial state changes run in audited server-side workflows.
-- =========================================================

create policy wallets_owner_or_finance_read on public.wallets for select using (app.owns_record(owner_user_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'finance.read')));
create policy financial_transactions_creator_or_finance_read on public.financial_transactions for select using (app.owns_record(created_by) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'finance.read')) or exists (select 1 from public.wallets wallet where wallet.id = wallet_id and app.owns_record(wallet.owner_user_id)));
create policy invoices_recipient_or_finance_read on public.invoices for select using (app.owns_record(recipient_user_id) or app.has_organisation_permission(organisation_id, 'finance.read'));
create policy subscriptions_owner_or_finance_read on public.subscriptions for select using (app.owns_record(subscriber_user_id) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'finance.read')));
create policy payouts_finance_read on public.payouts for select using (app.has_organisation_permission(organisation_id, 'finance.read'));
create policy refunds_requester_or_finance_read on public.refunds for select using (app.owns_record(requested_by) or exists (select 1 from public.financial_transactions transaction where transaction.id = transaction_id and transaction.organisation_id is not null and app.has_organisation_permission(transaction.organisation_id, 'finance.read')));
create policy commissions_finance_read on public.commissions for select using ((recipient_organisation_id is not null and app.has_organisation_permission(recipient_organisation_id, 'finance.read')) or exists (select 1 from public.financial_transactions transaction where transaction.id = transaction_id and transaction.organisation_id is not null and app.has_organisation_permission(transaction.organisation_id, 'finance.read')));
create policy accounting_entries_finance_read on public.accounting_entries for select using (exists (select 1 from public.financial_transactions transaction where transaction.id = transaction_id and transaction.organisation_id is not null and app.has_organisation_permission(transaction.organisation_id, 'finance.read')));
