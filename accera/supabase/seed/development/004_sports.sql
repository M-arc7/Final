insert into public.sports (name, slug) values ('Football', 'football'), ('Basketball', 'basketball'), ('Tennis', 'tennis'), ('Athletics', 'athletics') on conflict (slug) do nothing;
