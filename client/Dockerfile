# Câu 51: Khai báo Base Image
FROM node:22-alpine

# Câu 52: Thiết lập thư mục làm việc
WORKDIR /app

# Câu 53: Sao chép package.json
COPY package*.json ./

# Câu 54: Cài đặt các package
RUN npm install

# Câu 55: Sao chép source code React
COPY . .

# Câu 56: Build React Application
RUN npm run build

# Khai báo port và lệnh khởi động (Để Container duy trì hoạt động cho Câu 60)
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]