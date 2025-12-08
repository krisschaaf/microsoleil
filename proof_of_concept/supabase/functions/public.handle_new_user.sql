begin
  -- Assign default role
  insert into public.user_roles (user_id, role)
  values (new.id, 'farmer');

  return new;
end;