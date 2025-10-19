# #!/bin/bash

# # Set the Instance ID and path to the .env file
# INSTANCE_ID="i-06bd8527c5401e094"

# # Retrieve the public IP address of the specified EC2 instance
# ipv4_address=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# # Path to the .env file
# file_to_find="../backend/.env.docker"

# # Check the current FRONTEND_URL in the .env file
# current_url=$(sed -n "4p" $file_to_find)    always checking on line 4 a major issue if not on line 4 it will show error 

# # Update the .env file if the IP address has changed
# if [[ "$current_url" != "FRONTEND_URL=\"http://${ipv4_address}:5173\"" ]]; then
#     if [ -f $file_to_find ]; then
#         sed -i -e "s|FRONTEND_URL.*|FRONTEND_URL=\"http://${ipv4_address}:5173\"|g" $file_to_find
#     else
#         echo "ERROR: File not found."
#     fi
# fi

# Better code with handling and debugging
#!/bin/bash

INSTANCE_ID="i-06bd8527c5401e094"
file_to_find="../backend/.env.docker"

# Get public IP
ipv4_address=$(aws ec2 describe-instances --instance-ids "$INSTANCE_ID" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
echo "Retrieved IP: $ipv4_address"

# Check if file exists
if [ ! -f "$file_to_find" ]; then
    echo "ERROR: File not found at $file_to_find"
    exit 1
fi

# Get current FRONTEND_URL line
current_url=$(grep 'FRONTEND_URL' "$file_to_find")
echo "Current URL: $current_url"

# Update if different
if [[ "$current_url" != *"${ipv4_address}:5173"* ]]; then
    sed -i -e "s|FRONTEND_URL.*|FRONTEND_URL=\"http://${ipv4_address}:5173\"|g" "$file_to_find"
    echo "Updated FRONTEND_URL to http://${ipv4_address}:5173"
else
    echo "FRONTEND_URL is already up-to-date."
fi
