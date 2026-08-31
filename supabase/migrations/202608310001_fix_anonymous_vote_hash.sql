create or replace function public.toggle_anonymous_upvote(target_resource_id uuid, visitor_key text)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  key_hash text;
begin
  if visitor_key is null or visitor_key !~ '^[0-9a-fA-F-]{36}$' then
    raise exception 'Invalid visitor key';
  end if;
  if not exists(select 1 from public.resources where id=target_resource_id and status='approved') then
    raise exception 'Resource is not available for voting';
  end if;
  key_hash := encode(extensions.digest(visitor_key, 'sha256'), 'hex');
  if exists(select 1 from public.upvotes where resource_id=target_resource_id and visitor_key_hash=key_hash) then
    delete from public.upvotes where resource_id=target_resource_id and visitor_key_hash=key_hash;
    return false;
  end if;
  insert into public.upvotes(user_id, resource_id, visitor_key_hash) values(null, target_resource_id, key_hash);
  return true;
end $$;

revoke all on function public.toggle_anonymous_upvote(uuid,text) from public;
grant execute on function public.toggle_anonymous_upvote(uuid,text) to anon, authenticated;
